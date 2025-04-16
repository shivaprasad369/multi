import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

import { Check } from "lucide-react";


export default function Home() {
  return (
   <div className="p-3 flex flex-col gap-3">
    <div>
<Input placeholder="I am input"/>

    </div>
    <div className="">
      <Textarea placeholder="i am textarea"/>
    </div>
    <div className="">
      <Button variant={'elevated'}>Button</Button>

    </div>
    <Progress/>
    <div>
      <Checkbox/>
    </div>
  
   </div>
  );
}
