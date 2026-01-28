import CardClientList from "@/components/CardClientList";
import { fetchPost } from "@/lib/data/fetchPost";

export default function page() {
    return (
        // <div className="flex justify-center align-middle mt-96 gap-10">
        //     <Button variant={"destructive"} className="w-50 h-20 text-2xl">Joch o moa</Button>
        //     <Button variant="outline" className="w-50 h-20 text-2xl">Joch kor ban</Button>
        //     <Button variant={"ghost"} className="w-50 h-20 text-2xl">Joch o moa b</Button>
        //     <Button variant={"link"} className="w-50 h-20 text-2xl">button 4</Button>
        //     <Button variant={"secondary"} className="w-50 h-20 text-2xl">button 5</Button>
        // </div>
        <div>
        {/* <Cards userId={1} id={1} body="អានឹង card ទុកឪ្យប្រូ login" title="ចូល account ប្រូ" /> */}
        <CardClientList fetchPost={fetchPost()}/>
        </div>
    );
}
