'use client'
import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import toast from "react-hot-toast";
export default function CommentCard({title,setComment,setPosted}) {
  const [value, setValue] = useState("");
  const handlesubmit=(e)=>{
    e.preventDefault();
    if(value===""){
      toast.error("Comment is empty!");
      return;
    }
    setComment(value);
    setValue("");
    setPosted(true);
  }
  return (
    <Card className="w-full  bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80 border border-gray-100
">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://img.icons8.com/?size=100&id=67353&format=png&color=000000"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">Enter Comments</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <Textarea
          variant="faded"
          label="Description"
          value={value}a
          placeholder="Enter your comment"
          className="w-full"
          onValueChange={setValue}
        />
      </CardBody>
      <Divider />
      <CardFooter>
          <Button color="primary" className="w-full text-md font-bold" onClick={handlesubmit}> Submit</Button>
      </CardFooter>
    </Card>
  );
}