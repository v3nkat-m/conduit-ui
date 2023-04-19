import React from 'react'
import '../css/Table.css'

export default function Table() {
  const CROSSMARK = '\u2716'
  const CHECKMARK = '\u2714'
  const data = [
    {
      id: 1,
      Benefits: 'Earnings per 1000 reads',
      Conduit: '$3.80',
      Conduitplus: '$6.00',
    },
    {
      id: 2,
      Benefits: 'Platform processing fee on tips',
      Conduit: '7%',
      Conduitplus: '2.9%',
    },
    {
      id: 3,
      Benefits: 'Minimum withdrawal balance',
      Conduit: '$35',
      Conduitplus: '$20',
    },
    {
      id: 4,
      Benefits: 'Conduit+ Badge',
      Conduit: CROSSMARK,
      Conduitplus: CHECKMARK,
    },
    {
      id: 5,
      Benefits: 'Conduit+ Exclusive Challenges',
      Conduit: CROSSMARK,
      Conduitplus: CHECKMARK,
    },
    {
      id: 6,
      Benefits: 'Quick edit published stories',
      Conduit: CROSSMARK,
      Conduitplus: CHECKMARK,
    },
    {
      id: 7,
      Benefits: 'Subscribe to your favorite creators',
      Conduit: CHECKMARK,
      Conduitplus: CHECKMARK,
    },
    {
      id: 8,
      Benefits: 'Receive pledges from your readers',
      Conduit: CROSSMARK,
      Conduitplus: CHECKMARK,
    },
  ]
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Benefits</th>
          <th>Conduit</th>
          <th className='bold-conduit'>Conduit+</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.Benefits}</td>
            <td>{item.Conduit}</td>
            <td>{item.Conduitplus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
