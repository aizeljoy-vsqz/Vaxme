import { Label } from '@/components/ui/label';
import { ArrowBigRightDash, File, LucidePaperclip, Paperclip } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

export default function HistoryItem() {

    return (
        <div className='px-4'>
            <div className='flex p-4 items-center gap-4'>
                <Label className='text-gray-400'>12:05AM</Label>
                <div className='border border-1 rounded-sm p-1'>
                    <File className='w-[18px] h-[18px]' />
                </div>
                <div className='flex flex-col flex-1 gap-1'>
                    <Label>Vaccine Request</Label>
                    <Label className='text-gray-400'>Approved</Label>
                </div>
                <div className='flex flex-col flex-1 gap-1'>
                    <Label>Count:</Label>
                    <Badge className='bg-gray-300 rounded-full text-black-50'>50</Badge>
                </div>
            </div>
            <Separator />
        </div>


    )
}
{/* <div className="flex">
            <Label>{'12:05AM'}</Label>
            <ArrowBigRightDash></ArrowBigRightDash>
            <div className='flex flex-col flex-1'>
                <Label>{'Vaccine Request'}</Label>
                <Label>{'approved'}</Label>
            </div>
            <div className='flex flex-col flex-1'>
                <Label>Count:</Label>
                <Badge>00</Badge>
            </div>
    </div> */}