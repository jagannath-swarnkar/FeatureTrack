import React from "react";
import { Button } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";

interface IAddCommentProps {}
const AddEditComment = (props: IAddCommentProps) => {
	const [editorState, setEditorState] = React.useState<string>("");
	const editorRef: any = React.useRef(null);
	function focusEditor() {
		editorRef.current.focus();
	}
	return (
		<div className="comment_form">
			<h5 className="mb-2 text-info">Add New Comment</h5>
			<div className="editor_cont" onClick={focusEditor}>
				<ReactQuill
					theme="snow"
					value={editorState}
					onChange={setEditorState}
					ref={editorRef}
					placeholder="Write something here..."
					className="quill-editor"
					modules={AddEditComment.modules}
					formats={AddEditComment.formats}
				/>
			</div>
			<div className="d-flex justify-content-end my-3">
				<Button title="Submit" variant="contained">
					Submit
				</Button>
			</div>
			<br />
			<hr />
		</div>
	);
};

export default AddEditComment;

AddEditComment.modules = {
	toolbar: [
		[{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
		[{ size: [] }],
		["bold", "italic", "underline", "blockquote", "code-block", "link"],
		[{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
		["image"]
	],
	clipboard: {
		matchVisual: false
	}
};
AddEditComment.formats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
	"code-block"
];
