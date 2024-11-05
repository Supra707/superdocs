import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "./ui/textarea"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"

export function CardWithForm({ addComment, demo_user }) {
  const [commentText, setCommentText] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (commentText !== "") {
      addComment({
        comment_text: commentText,
        user_tagged: demo_user,
      });
      setCommentText(""); // Clear the textarea after submission
    } else {
      toast.error("Empty Comment Not Allowed");
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Enter Comments</CardTitle>
        <CardDescription>Publish your comments in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="comment">Comments</Label>
              <Textarea
                id="comment"
                value={commentText}
                placeholder="Enter Comments..."
                onChange={(e) => setCommentText(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleOnSubmit}>Publish</Button>
      </CardFooter>
    </Card>
  )
}
