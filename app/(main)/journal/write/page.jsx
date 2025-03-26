"use client"
import { getMoodById, MOODS } from "@/app/lib/moods"
import { journalSchema } from "@/app/lib/schema"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import dynamic from "next/dynamic"
import { useForm } from "react-hook-form"
import { BarLoader } from "react-spinners"
import { useRouter } from "next/router"
import useFetch from "@/hooks/use-fetch"

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

export default function JournalEntryPage() {

    const router=useRouter();

    const{
        loading:entryLoading,
        data:existingEntry,
        fn:fetchEntry,
    }=useFetch(getJournalEntry);

    const { register, handleSubmit, control, setValue, getValues, watch, reset, formState: { errors, isDirty }, } = useForm({
        resolver: zodResolver(journalSchema),
        defaultValues: {
            title: "",
            content: "",
            mood: "",
            collectionId: "",
        }
    })

    const onSubmit=handleSubmit(async(data)=>{
        const mood=getMoodById(data.mood);
        actionFn({
            ...data,
            moodScore:mood.score,
            moodQuery:mood.pixabayQuery,
        });
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <form className="space-y-2 mx-auto">
                <h1 className="text-5xl md:text-6xl gradient-title">
                    What&apos;s on your mind?
                </h1>
                {/* {isLoading && <BarLoader className="mb-4" color="orange" width={"100%"} />} */}

                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input {...register("title")}
                        placeholder="Give your entry a title..."
                        className={`py-5 md:text--md ${errors.title ? "border-red-500" : ""}`}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        How are you feeling?
                    </label>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(MOODS).map((mood) => (
                                <SelectItem key={mood.id} value={mood.id}>
                                    <span>
                                        {mood.emoji} {mood.label}
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </form>
        </div>
    )
}
