import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ReactQuillEditor = ({ onChange, defaultValue }: any) => {
  const modules = {
    toolbar: [
      [{ header: [] }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'background',
    'color',
  ];

  return (
    <div className='text-editor'>
      <ReactQuill
        theme='snow'
        value={defaultValue}
        onChange={(value: any) => onChange(value)}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default ReactQuillEditor;
