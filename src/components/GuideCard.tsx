import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardTitle, CardDescription } from './ui/Card';
import type { Guide } from '../data/guides';

interface GuideCardProps {
  guide: Guide;
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link to={`/guides/${guide.slug}`} className="block transition-transform hover:scale-[1.02]">
      <Card className="h-full overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={guide.image} 
            alt={guide.title} 
            className="w-full h-full object-cover transition-transform hover:scale-[1.05]"
          />
          <div className="absolute top-2 right-2">
            <span className="text-xs px-2 py-1 rounded bg-primary-transparent border border-border-primary text-primary">{guide.category}</span>
          </div>
        </div>
        <CardContent>
          <CardTitle>{guide.title}</CardTitle>
          <CardDescription>{guide.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
} 