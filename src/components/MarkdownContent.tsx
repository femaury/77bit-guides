import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownContentProps {
  content: string;
  className?: string;
  baseImagePath?: string;
}

// Helper function to generate URL-friendly IDs from heading text
const generateSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with dashes
    .replace(/&/g, '-and-')     // Replace & with 'and'
    .replace(/[^\w-]+/g, '')    // Remove all non-word chars
    .replace(/--+/g, '-');      // Replace multiple dashes with single dash
};

export function MarkdownContent({ content, className, baseImagePath = '' }: MarkdownContentProps) {
  // Preprocess markdown to transform Notion-style callouts before rendering
  const preprocessMarkdown = (markdown: string): string => {
    // First handle image paths
    const processedContent = baseImagePath 
      ? markdown.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, path) => {
          // If path is already absolute or external, don't modify it
          if (path.startsWith('http') || path.startsWith('/')) {
            return match;
          }
          return `![${alt}](${baseImagePath}/${path})`;
        })
      : markdown;
    
    // Now find all Notion-style callouts and replace them with a custom format
    // that we can then process with a custom component
    const lines = processedContent.split('\n');
    let inCallout = false;
    let calloutType = '';
    let calloutTitle = '';
    let calloutEmoji = '';
    let calloutContent = '';
    const resultLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check for callout start ("> 💡" or "> ⚠️" pattern)
      if (line.match(/^>\s*(💡|⚠️|ℹ️|📝|🚨|✅|❓|🔔)\s*$/) && !inCallout) {
        // Start of a callout
        inCallout = true;
        const match = line.match(/^>\s*(💡|⚠️|ℹ️|📝|🚨|✅|❓|🔔)\s*$/);
        calloutEmoji = match ? match[1] : '';
        
        // Determine callout type from emoji
        switch (calloutEmoji) {
          case '💡': calloutType = 'tip'; calloutTitle = 'Tip'; break;
          case '⚠️': calloutType = 'warning'; calloutTitle = 'Warning'; break;
          case 'ℹ️': calloutType = 'info'; calloutTitle = 'Info'; break;
          case '📝': calloutType = 'note'; calloutTitle = 'Note'; break;
          case '🚨': calloutType = 'alert'; calloutTitle = 'Alert'; break;
          case '✅': calloutType = 'success'; calloutTitle = 'Success'; break;
          case '❓': calloutType = 'question'; calloutTitle = 'Question'; break;
          case '🔔': calloutType = 'important'; calloutTitle = 'Important'; break;
          default: calloutType = 'note'; calloutTitle = 'Note';
        }
        
        calloutContent = '';
        
        // Skip the next line if it's just ">"
        if (i + 1 < lines.length && lines[i + 1].trim() === '>') {
          i++;
        }
      } 
      // Check if we're in a callout and collecting content
      else if (inCallout && line.startsWith('>')) {
        // Remove the leading > and add to callout content
        calloutContent += line.replace(/^>\s*/, '') + '\n';
      } 
      // Check if callout is ending (next line is not a blockquote or end of file)
      else if (inCallout && (i === lines.length - 1 || !lines[i].startsWith('>'))) {
        // End of callout
        // Use a special HTML comment format that we can parse later
        resultLines.push('');
        resultLines.push(`<!-- NOTION-CALLOUT type="${calloutType}" emoji="${calloutEmoji}" title="${calloutTitle}" -->`);
        resultLines.push(calloutContent.trim());
        resultLines.push('<!-- END-NOTION-CALLOUT -->');
        resultLines.push('');
        
        inCallout = false;
        // Process current line normally
        resultLines.push(line);
      } 
      // Regular line, not in a callout
      else {
        resultLines.push(line);
      }
    }
    
    // If we're still in a callout at the end of the file, close it
    if (inCallout) {
      resultLines.push('');
      resultLines.push(`<!-- NOTION-CALLOUT type="${calloutType}" emoji="${calloutEmoji}" title="${calloutTitle}" -->`);
      resultLines.push(calloutContent.trim());
      resultLines.push('<!-- END-NOTION-CALLOUT -->');
      resultLines.push('');
    }
    
    return resultLines.join('\n');
  };
  
  // Process the content
  const processedContent = preprocessMarkdown(content);
  
  // Find all callout sections in the processed markdown
  const calloutPattern = /<!-- NOTION-CALLOUT type="([^"]+)" emoji="([^"]+)" title="([^"]+)" -->\n([\s\S]*?)\n<!-- END-NOTION-CALLOUT -->/g;
  
  // Replace them with custom elements
  const contentWithCallouts = processedContent.replace(calloutPattern, (_, type, emoji, title, calloutContent) => {
    // We'll handle the markdown content directly as a data attribute
    // No need for a placeholder as we'll process it completely in the custom component
    return `<div class="notion-callout notion-callout-${type}" data-callout-type="${type}" data-callout-emoji="${emoji}" data-callout-title="${title}" data-callout-content="${encodeURIComponent(calloutContent)}">
      <div class="notion-callout-icon">${emoji}</div>
      <div class="notion-callout-content">
        <div class="notion-callout-title">${title}</div>
        <div class="notion-callout-text"></div>
      </div>
    </div>`;
  });
  
  return (
    <div className={cn('prose prose-invert prose-yellow max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Add GitHub Flavored Markdown support for tables
        rehypePlugins={[rehypeRaw]} // Allow raw HTML in markdown
        components={{
          // First level headers are handled by our page layout, so we style this as a slightly smaller header
          h1: ({ children }) => {
            const id = generateSlug(children?.toString() || '');
            return (
              <h1 id={id} className="text-2xl font-bold mb-6 mt-2 text-primary border-b border-border-primary pb-4">
                <a href={`#${id}`} className="anchor-link">
                  {children}
                </a>
              </h1>
            );
          },
          h2: ({ children }) => {
            const id = generateSlug(children?.toString() || '');
            return (
              <h2 id={id} className="text-xl font-bold mt-10 mb-4 text-primary drop-shadow">
                <a href={`#${id}`} className="anchor-link">
                  {children}
                </a>
              </h2>
            );
          },
          h3: ({ children }) => {
            const id = generateSlug(children?.toString() || '');
            return (
              <h3 id={id} className="text-lg font-bold mt-8 mb-3 text-primary/90">
                <a href={`#${id}`} className="anchor-link">
                  {children}
                </a>
              </h3>
            );
          },
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
              <table>
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead>
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody>
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr>
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="text-primary">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="text-gray-200/90">
              {children}
            </td>
          ),
          code: ({ children, className }) => {
            // Check if it's an inline code or a regular code block
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
              {/* Only show caption if it's not a filename and not empty */}
              {alt && 
                !alt.includes('.png') && 
                !alt.includes('.jpg') && 
                !alt.includes('.jpeg') && 
                !alt.includes('.gif') && 
                alt !== 'image' && 
                alt !== 'image.png' && (
                <p className="text-sm text-center text-gray-400 mt-2">{alt}</p>
              )}
            </div>
          ),
          aside: ({ children }) => (
            <div className="bg-[rgba(252,213,73,0.05)] border border-[rgba(252,213,73,0.2)] rounded-lg p-4 my-6">
              {children}
            </div>
          ),
          // Handle our custom callout div
          div: ({ className, children, ...props }) => {
            // Check if this is our callout div
            if (className?.includes('notion-callout')) {
              // Get the stored markdown content from the data attribute
              // @ts-expect-error - We know these properties exist on our custom divs
              const calloutContent = props['data-callout-content'] ? decodeURIComponent(props['data-callout-content']) : '';
              // @ts-expect-error - Getting emoji and title from data attributes
              const emoji = props['data-callout-emoji'] || '';
              
              return (
                <div className={className}>
                  <div className="notion-callout-icon">{emoji}</div>
                  <div className="notion-callout-content">
                    <div className="notion-callout-text">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p className="mb-3">{children}</p>,
                          strong: ({ children }) => <strong className="font-bold text-inherit">{children}</strong>,
                          a: ({ children, href }) => <a href={href} className="text-inherit underline">{children}</a>,
                          ul: ({ children }) => <ul className="list-disc ml-5 mb-3">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal ml-5 mb-3">{children}</ol>,
                          li: ({ children }) => <li className="mb-1">{children}</li>,
                          code: ({ children }) => <code className="bg-black/30 px-1 py-0.5 rounded font-mono text-sm">{children}</code>
                        }}
                      >
                        {calloutContent}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            }
            // Normal div
            return <div className={className}>{children}</div>;
          }
        }}
      >
        {contentWithCallouts}
      </ReactMarkdown>
    </div>
  );
} 