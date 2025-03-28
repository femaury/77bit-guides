import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
  className?: string;
  baseImagePath?: string;
}

export function MarkdownContent({ content, className, baseImagePath = '' }: MarkdownContentProps) {
  // Handle Notion's image paths if needed
  const processedContent = baseImagePath 
    ? content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, path) => {
        // If path is already absolute or external, don't modify it
        if (path.startsWith('http') || path.startsWith('/')) {
          return match;
        }
        return `![${alt}](${baseImagePath}/${path})`;
      })
    : content;

  return (
    <div className={cn('prose prose-invert prose-yellow max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Add GitHub Flavored Markdown support for tables
        components={{
          // First level headers are handled by our page layout, so we style this as a slightly smaller header
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mb-6 mt-2 text-yellow-500/90 border-b border-border-primary pb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold mt-10 mb-4 text-yellow-500/90 drop-shadow">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold mt-8 mb-3 text-yellow-500/80">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 text-gray-200/90 leading-relaxed">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="my-4 ml-6 list-disc text-gray-200/90">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 ml-6 list-decimal text-gray-200/90">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="mb-2">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary/40 pl-4 italic text-gray-400 my-6 bg-bg-primary/30 py-2 pr-4 rounded-r">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a href={href} className="text-primary hover:text-primary-hover underline transition-colors">
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-primary/90">
              {children}
            </strong>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-[rgba(252,213,73,0.2)] rounded-lg">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[rgba(252,213,73,0.1)]">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-[rgba(252,213,73,0.1)]">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-[rgba(255,255,255,0.03)]">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-sm font-medium text-yellow-500/90">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-gray-200/90">
              {children}
            </td>
          ),
          code: ({ children, className }) => {
            // Check if it's an inline code or a code block
            const isInline = !className;
            return isInline ? (
              <code className="bg-black/30 px-1.5 py-0.5 rounded text-primary/90 font-mono text-sm">
                {children}
              </code>
            ) : (
              <code className={`${className} block bg-black/40 p-4 rounded-md overflow-x-auto font-mono text-sm`}>
                {children}
              </code>
            );
          },
          hr: () => (
            <hr className="my-8 border-t border-[rgba(252,213,73,0.1)]" />
          ),
          img: ({ src, alt }) => (
            <div className="my-6">
              <img 
                src={src} 
                alt={alt || ''} 
                className="rounded-lg max-w-full h-auto border border-[rgba(252,213,73,0.2)] shadow-md" 
              />
              {alt && alt !== 'image.png' && (
                <p className="text-sm text-center text-gray-400 mt-2">{alt}</p>
              )}
            </div>
          ),
          aside: ({ children }) => (
            <div className="bg-[rgba(252,213,73,0.05)] border border-[rgba(252,213,73,0.2)] rounded-lg p-4 my-6">
              {children}
            </div>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
} 