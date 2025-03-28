import { Link } from 'react-router-dom';
import { Card, CardContent, CardTitle, CardDescription } from './ui/Card';
import { cn } from '../lib/utils';
import type { Guide } from '../data/guides';

interface GuideCardProps {
  guide: Guide;
  className?: string;
}

export function GuideCard({ guide, className }: GuideCardProps) {
  return (
    <Link 
      to={`/guides/${guide.slug}`} 
      className={cn("block group h-full", className)}
      aria-label={`Read ${guide.title} guide`}
    >
      <Card 
        className={cn(
          "h-full overflow-hidden flex flex-col",
          "group bg-gradient-to-t from-[#111111] to-[#0a0a0a] border border-[#FCD549]/20 rounded-lg p-0",
          "transition-all duration-300 transform hover:-translate-y-1",
          "shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_48px_rgba(252,213,73,0.15)]",
          "hover:border-[#FCD549]"
        )}
      >
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={guide.image} 
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
        </div>
        
        <CardContent className="flex-grow flex flex-col p-6">
          <CardTitle className="text-lg sm:text-xl transition-colors group-hover:text-[#FCD549]">
            {guide.title}
          </CardTitle>
          <CardDescription className="mt-2 text-gray-400 line-clamp-2">
            {guide.description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
} 