import { Avatar, List } from 'antd';

export function Leaderboard() {

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  return (
    <div className='flex flex-col w-full gap-10'>
      <h1 style={{ fontSize: '3rem' }}>Leaderboard</h1>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://noun-api.com/beta/pfp?name=`+item.title} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <div>Content</div>
          </List.Item>
        )}
        
      />
    </div>
  );
}