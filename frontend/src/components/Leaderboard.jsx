import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/leaderboard")
      .then((res) => setData(res.data));
  }, []);

  const topThree = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl">
      <h2 className="text-orange-400 mb-6 text-lg">Leaderboard</h2>

      {/* Top 3 */}
      <div className="flex justify-center items-end gap-6 mb-8">

        {topThree[1] && (
          <div className="bg-yellow-400 text-black p-5 rounded-xl h-40 w-28 text-center">
            <h3>{topThree[1]?.user?.username || topThree[1]?.user?.name || "User"}</h3>
            <p>2nd</p>
            <span>{topThree[1]?.score}</span>
          </div>
        )}

        {topThree[0] && (
          <div className="bg-blue-400 text-black p-6 rounded-xl h-52 w-32 text-center">
            <h3>{topThree[0]?.user?.username || topThree[0]?.user?.name || "User"}</h3>
            <p>1st</p>
            <span>{topThree[0]?.score}</span>
          </div>
        )}

        {topThree[2] && (
          <div className="bg-pink-300 text-black p-5 rounded-xl h-36 w-28 text-center">
            <h3>{topThree[2]?.user?.username || topThree[2]?.user?.name || "User"}</h3>
            <p>3rd</p>
            <span>{topThree[2]?.score}</span>
          </div>
        )}

      </div>

      {/* Rest list */}
      <div className="bg-gray-800 rounded-xl p-4">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400">
              <th className="text-left">Name</th>
              <th>Rank</th>
              <th className="text-right">Points</th>
            </tr>
          </thead>

          <tbody>
            {rest.map((d, i) => (
              <tr key={i} className="border-b border-gray-700">
                <td className="py-3">
                  {d?.user?.username || d?.user?.name || "Unknown"}
                </td>
                <td className="text-center">{i + 4}</td>
                <td className="text-right text-orange-400">
                  {d?.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}