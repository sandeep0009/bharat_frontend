
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
interface EditorProps{
    value:string;
    onChange:(value:string)=>void
}


export const Editor=({value,onChange}:EditorProps)=>{
    return(
        <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow"
        modules={
            {
                toolbar:[
                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    ['link'],
                    [{ 'align': [] }],
                    ['clean'] 
                ]
            }
        }
        />

    )
}