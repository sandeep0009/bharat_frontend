import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Editor } from "./Editor";
import { Input } from "./ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axiosInstance";

interface CreateFaqProps {
    handleCloseModal: () => void;
}

export const CreateFaq = ({ handleCloseModal }: CreateFaqProps) => {
    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [languages, setLanguages] = useState<string[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const adminKey=localStorage.getItem('adminKey');

    const handleAddLanguage = () => {
        if (selectedLanguage && !languages.includes(selectedLanguage)) {
            setLanguages([...languages, selectedLanguage]);
        }
    };

    const handleRemoveLanguage = (lang: string) => {
        setLanguages(languages.filter(language => language !== lang));
    };

    const handleSubmit =async () => {
        try {
            const res=await axiosInstance.post('/create-faq',{question,answer,lng:languages},{
                headers:{
                    adminKey:adminKey
                }
               });
               if(res.status===201){
                alert('created successfully');
                handleCloseModal();
               }
            
        } catch (error) {
            alert(error);
            
        }
      
    };

    const isSubmitDisabled = languages.length < 2;

    return (
        <div className="flex flex-col items-center justify-start space-y-4 p-6">
            <Card className="w-full max-w-lg p-4">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Create FAQ Question</CardTitle>
                            <CardDescription className="py-2">Create multilingual FAQs and select multiple languages</CardDescription>
                        </div>
                        <div className="text-black cursor-pointer text-2xl font-semibold" onClick={handleCloseModal}>
                            &times;
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input 
                        type="text" 
                        placeholder="Enter Question"
                        value={question} 
                        onChange={(e) => setQuestion(e.target.value)} 
                        className="w-full"
                    />
                    <Editor value={answer} onChange={setAnswer} />
                    
                    <div className="flex items-center gap-4">
                        <div className="w-full">
                            <Select 
                                value={selectedLanguage} 
                                onValueChange={setSelectedLanguage}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hi">Hindi</SelectItem>
                                    <SelectItem value="bn">Bengali</SelectItem>
                                    <SelectItem value="fr">French</SelectItem>
                                    <SelectItem value="es">Spanish</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button 
                            onClick={handleAddLanguage} 
                            disabled={!selectedLanguage}
                            className="ml-2"
                        >
                            Add
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {languages.map((language, index) => (
                            <div 
                                key={index} 
                                className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full"
                            >
                                <span className="text-sm">{language}</span>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleRemoveLanguage(language)}
                                    className="text-xs px-2 h-6"
                                >
                                    &times;
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <div className="flex justify-end p-4">
                    <Button onClick={handleSubmit} disabled={isSubmitDisabled}>Save FAQ</Button>
                </div>
            </Card>
        </div>
    );
};
