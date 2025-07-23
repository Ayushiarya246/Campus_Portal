import React from 'react';
import { MapPin } from 'lucide-react';
import { Banknote } from 'lucide-react';

function Company({ id, item }) {
  return (
    <div className="h-[450px] w-[350px] bg-white rounded-lg shadow-xl shadow-blue-800 flex-col sm:h-[350px] sm:w-[500px]">
      <h1 className="text-2xl font-bold text-center text-pink-800">{item.name}</h1>
      <h2 className="my-[20px] text-xl italic text-center">
        Role:{' '}
        <span className="underline">{item.role}</span>
      </h2>
      <h2 className="my-[20px] font-bold text-lg text-red-600 pl-[20px]">
        !{' '}
        Last Day To Apply:
        <span className="text-red-400 underline">
          {item.deadline?.toDate().toLocaleDateString()}
        </span>
      </h2>
      <h2 className="text-lg font-bold border text-center">
        CGPA Criteria:{' '}
        <span className="text-blue-600">{item.cgpa}</span>
      </h2>
      <p className="flex text-[20px] pl-[15px] mt-[20px]">
        <MapPin className="text-green-500 h-[20px] mt-[5px]" />
        Location: {item.location}
      </p>
      <p className="flex text-[20px] pl-[15px]">
        <Banknote className="text-green-500 mt-[3px]" />
        Salary: ₹{item.salary}
      </p>
      <div className="flex mt-[20px]">
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="pl-[20px] mt-[5px] text-blue-800 underline"
        >
          Company Website
        </a>
        <a
          href={`/apply/${item.name}`}
          className="pl-[20px] mt-[5px] text-green-700 underline"
        >
          Apply Here
        </a>
      </div>
    </div>
  );
}

export default Company;
