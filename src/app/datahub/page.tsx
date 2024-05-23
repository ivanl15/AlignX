"use client"

import Link from 'next/link';
import { useState } from 'react';
import { AlignmentItems, dataItem, monkdata } from '../data';
import { Avatar, Button, Card, Image } from 'antd';
import axios from 'axios';


export default function Home() {
  const { Meta } = Card;
  enum Tabs {
    TopicList,
    Voting
  }
  const [tab, setTab] = useState<Tabs>(Tabs.TopicList);
  const [choice, setChoice] = useState<dataItem>();
  const [alignmentItems, setAlignmentItems] = useState<AlignmentItems>([]);

  function selectTopic(item: dataItem) {
    console.log(item);
    setChoice(item);
  
    // Use axios to fetch data from an API
    axios.get(`http://localhost:5000/read?key=`+item.title.replace(" ", "_"))  // Assuming 'item.id' identifies the data needed from the API
      .then(response => {
        console.log('Data fetched:', response.data);
        
        console.log('Data fetched:', Array.isArray(response.data) );
        // Assuming the response data is the format expected for alignmentItems
        setAlignmentItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle errors or set default state if needed
        setAlignmentItems([]);
      });
    
    setTab(Tabs.Voting);
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
            {Array.isArray(monkdata) && monkdata.map((item, i) => (
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
            {alignmentItems.map((item, i) => (
              <Card 
                style={{ width: 1000, padding: 20}}
              >
                <div className='flex flex-col items-end gap-10'>
                  <h1>{item.scenarioDescription}</h1>
                  <h3>{item.statement}</h3>
                  <div className='flex flex-row gap-10'>
                    <Button onClick={() => { }}>Yes</Button>
                    <Button onClick={() => { }}>No</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className='flex flex-row gap-10'>
            <button onClick={() => { setTab(Tabs.TopicList) }}> {"\< Back"} </button>
          </div>
        </div>}
      </div>
    </main>
  );
}
