import { Avatar, List } from 'antd';
import { LeaderboardItem, MockHotRewards } from './data';
import { abi } from './datahub/abi';
import { useReadContract } from 'wagmi';
import { stringify } from 'querystring';

export function Leaderboard() {

  function getLeaderboard() {
    // get leaderboard from the blockchain
    // return leaderboard
    const result = useReadContract({
      abi: abi,
      address: "0x66b3BF545AcC64Eb5517524821de6a8289531DfC",
      functionName: 'fetchUser2Donation'
    })
    if (result.data) {
      console.log("get Leaderboard: ", (result.data[0].amount));
      return result.data;
    }
    return [];
  }

  return (
    <div className='flex flex-col w-full gap-10'>
      <h1 style={{ fontSize: '3rem' }}>Leaderboard</h1>
      <List
        itemLayout="horizontal"
        dataSource={getLeaderboard()}
        renderItem={(item: LeaderboardItem, index: number) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://noun-api.com/beta/pfp?name=`+item.user} />}
              title={<a href="https://ant.design">{item.user}</a>}
            />
            <div>{item.amount}</div>
          </List.Item>
        )}
        
      />
    </div>
  );
}