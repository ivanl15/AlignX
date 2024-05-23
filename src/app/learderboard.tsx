import { Avatar, List } from 'antd';
import { MockHotRewards } from './data';

export function Leaderboard() {

  return (
    <div className='flex flex-col w-full gap-10'>
      <h1 style={{ fontSize: '3rem' }}>Leaderboard</h1>
      <List
        itemLayout="horizontal"
        dataSource={MockHotRewards}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://noun-api.com/beta/pfp?name=`+item.address} />}
              title={<a href="https://ant.design">{item.address}</a>}
            />
            <div>{item.money} $ALX</div>
          </List.Item>
        )}
        
      />
    </div>
  );
}