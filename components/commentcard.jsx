import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CommentCard = ({ userTagged, commentText }) => {
  return (
    <Card className="bg-slate-800 border border-slate-700 rounded-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-white">{userTagged}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-300">{commentText}</div>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
