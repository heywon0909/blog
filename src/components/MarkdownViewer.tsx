import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from 'next/image';

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ children, className, node, ref, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter PreTag="div" language={match[1]} {...props} style={coldarkCold}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            );
          },
          img: image => (
            <Image
              className="w-full object-cover"
              src={String(image.src || '')}
              alt={image.alt || ''}
              width={500}
              height={350}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
