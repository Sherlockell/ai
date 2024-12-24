import React from "react";

interface Props {
	value: string;
	onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
	return (
		<div className="prose prose-invert max-w-none">
			<textarea
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full min-h-[300px] bg-white/5 border border-white/10 rounded-lg p-4 text-white resize-y"
				placeholder="Write your post content here..."
			/>
		</div>
	);
}
