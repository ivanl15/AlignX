"use client"

import Link from 'next/link';
import { useState } from 'react';
import {  AlignVotingItem, MockAlignmentItems, dataItem, mockTopic } from '../data';
import { Avatar, Button, Card, Image, List } from 'antd';
import axios from 'axios';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { useReadContract, useWriteContract } from 'wagmi';
import { abi } from './abi';


export default function Home() {
  const { Meta } = Card;
  const { writeContract } = useWriteContract();
  enum Tabs {
    TopicList,
    Voting
  }
  const [tab, setTab] = useState<Tabs>(Tabs.TopicList);
  const [choice, setChoice] = useState<dataItem>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [alignData, setAlignData] = useState<AlignVotingItem[]>([]);

  function selectTopic(item: dataItem) {
    console.log(item);
    setChoice(item);
    
    setTab(Tabs.Voting);
    setCurrentIndex(0);
  }

  function vote(yes: boolean) {
    let id = MockAlignmentItems[currentIndex].index;
    // initialize a new AlignVotingItem
    const newAlignData: AlignVotingItem = {
      id: id,
      vote: yes? 1:0,
    };
    setAlignData([...alignData, newAlignData]);
    console.log('Voted');
    setCurrentIndex(currentIndex + 1);
  }
  
  function submit(){
    console.log('Submitted');
    console.log(alignData);
    const result = writeContract({ 
      abi,
      address: '0xc987ccbB0a7709B601AC72e91a1bd04e9068baE7',
      functionName: 'castVote',
      args: [
        // dataIDs_
        alignData.map((item) => item.id),
        // votes_
        alignData.map((item) => item.vote),
      ],
   })
    console.log(result);
    setTab(Tabs.TopicList);
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-12">
      <div className="z-10 w-full max-w-6xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-row justify-start items-end gap-20 w-full">
          <h1 className="text-4xl font-bold"><Link href="/">AlignX</Link></h1>
        </div>
        <div>
          <w3m-button />
        </div>
      </div>

      <div className='w-full p-10 '>
        {tab == Tabs.TopicList && <div className='flex flex-col w-full gap-10'>
          <h1 style={{ fontSize: '3rem' }}>Topics</h1>
          <div className="flex flex-row flex-wrap justify-center gap-10">
            {Array.isArray(mockTopic) && mockTopic.map((item, i) => (
              <Card
                key={i}
                hoverable
                style={{ width: 240 }}
                cover={<Image alt={item.title+'\'s Avatar'} src={"https://noun-api.com/beta/pfp?name=" + item.title} />}
              >
                <Meta title={item.title} description={item.description} />
                <Button onClick={() => { selectTopic(item) }}>Vote</Button>
              </Card>
            ))}
          </div>
        </div>}
        {tab == Tabs.Voting && <div className='flex flex-col w-full gap-10'>
          <h1 style={{ fontSize: '3rem' }}> 
            <Avatar src={"https://noun-api.com/beta/pfp?name=" + choice?.title} size={80}/> 
            {"  "+choice?.title}
          </h1>
          <h3 style={{ fontSize: '1.5rem' }}>{choice?.description}</h3>
          {/* A Card to contain data for chosen topic */}
          <div className='flex flex-col gap-10'>
              <Card 
                style={{ width: 1000, padding: 20}}
              >
                {(currentIndex < MockAlignmentItems.length) && (
                <div className='flex flex-col items-end gap-10'>
                  <h1>{MockAlignmentItems[currentIndex].scenarioDescription}</h1>
                  <h3>{MockAlignmentItems[currentIndex].statement}</h3>
                  <div className='flex flex-row gap-10'>
                    <Button onClick={() => { vote(true) }}>Yes</Button>
                    <Button onClick={() => { vote(false) }}>No</Button>
                  </div>
                </div>)}
                {(currentIndex >= MockAlignmentItems.length) && (
                  <div className='flex w-full flex-col items-end gap-10'>
                    <div className='flex w-full flex-col items-start gap-10'>
                      <h1 style={{fontSize: '1.2rem'}}>🎉Thank you for voting!</h1>
                      <h3>😎  Here are your votes:</h3>
                      <List
                        style={{width: 900}}
                        itemLayout="horizontal"
                        dataSource={alignData}
                        renderItem={(item, index) => (
                          <List.Item>
                            <List.Item.Meta
                              title={MockAlignmentItems[index].index}
                              description={MockAlignmentItems[index].statement}
                            />
                            <div>{item.vote ? (<CheckCircleTwoTone />) : (<CloseCircleTwoTone />)}</div>
                          </List.Item>
                        )}
                      />
                    </div>
                    <Button onClick={() => { submit() }}>Submit</Button>
                  </div>
                )}
              </Card>
          </div>
          <div className='flex flex-row gap-10'>
            <button onClick={() => { setTab(Tabs.TopicList) }}> {"\< Back"} </button>
          </div>
        </div>}
      </div>
    </main>
  );
}
