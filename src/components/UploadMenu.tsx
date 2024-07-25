"use client";
import { useRef, useState } from 'react';
import { uploadMenu } from '../app/actions';
import { readStreamableValue } from 'ai/rsc';

export default function UploadMenu() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [res, setRes] = useState('')
  return (
    <>
      <form action={async (e) => {
        const result = await uploadMenu(e)
        console.log(result)

      }} className="flex flex-col gap-4">
        <div>
          <span>Upload a file</span>
          <input type="file" name="file" ref={fileInput} />
        </div>
        <button className='bg-red-700 text-neutral-300' type="submit">Submit</button>
      </form>
      <p>{res}</p>
    </>
  );
}