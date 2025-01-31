import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateFaq } from "@/components/CreateFaq";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Trash2 } from "lucide-react";
import { axiosInstance } from "@/lib/axiosInstance";

interface FAQ {
    id: number;
    question: string;
    answer: string;
}

export const Admin = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [faqs, setFaqs] = useState<FAQ[]>([
        { id: 1, question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
        { id: 2, question: "What is ShadCN?", answer: "ShadCN provides UI components built with Tailwind CSS and Radix UI." }
    ]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDeleteFaq = (id: number) => {
        setFaqs(faqs.filter(faq => faq.id !== id));
    };

    const handleGetFaq=async()=>{
        const res=await axiosInstance.get('/faq/?lng=hi');
        console.log(res.data.faqWithTranslation);
    }

    useEffect(()=>{
        handleGetFaq()
    },[])

    return (
        <div className="max-w-4xl m-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Admin Dashboard</h2>
                <Button onClick={handleOpenModal}>Add FAQ</Button>
            </div>

            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead>Answer</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {faqs.length > 0 ? (
                        faqs.map((faq) => (
                            <TableRow key={faq.id}>
                                <TableCell>{faq.question}</TableCell>
                                <TableCell>{faq.answer}</TableCell>
                                <TableCell className="flex justify-center gap-4">
                                    <Eye className="w-5 h-5 text-blue-500 cursor-pointer" />
                                    <Trash2 
                                        className="w-5 h-5 text-red-500 cursor-pointer" 
                                        onClick={() => handleDeleteFaq(faq.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center py-4">No FAQs available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                        <CreateFaq handleCloseModal={handleCloseModal} />
                    </div>
                </div>
            )}
        </div>
    );
};
