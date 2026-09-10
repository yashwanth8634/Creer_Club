"use client";

import { useState } from "react";
import Image from "next/image";

export interface EventGalleryGroup {
  _id: string;
  title: string;
  date: string;
  venue?: string;
  images: { url: string; key?: string }[];
}

interface SelectedImage {
  url: string;
  eventTitle: string;
  eventDate: string;
  index: number;
  total: number;
}

export default function GalleryGrid({ groups }: { groups: EventGalleryGroup[] }) {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  if (groups.length === 0) {
    return (
      <div className="text-center py-20 bg-accent/15 rounded-3xl border border-accent/40 max-w-2xl mx-auto px-6">
        <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="font-serif font-bold text-2xl text-primary mb-2">No Workshop Photos Yet</h3>
        <p className="text-foreground/70 text-sm max-w-md mx-auto leading-relaxed">
          Photos from our workshops are uploaded here after each event. Join our next workshop to paint with us!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16 sm:space-y-20">
      {groups.map((group) => (
        <section
          key={group._id}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-accent/50 shadow-xs transition-all duration-300 hover:shadow-md"
        >
          {/* Workshop Event Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-accent/40">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary mb-1.5 block">
                Workshop Edition
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
                {group.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs sm:text-sm text-foreground/60">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{group.date}</span>
                </span>
                {group.venue && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>{group.venue}</span>
                  </span>
                )}
              </div>
            </div>

            <span className="self-start sm:self-auto text-xs font-semibold px-3 py-1 rounded-full bg-accent/30 text-foreground/75 border border-accent/50">
              {group.images.length} {group.images.length === 1 ? "Photo" : "Photos"}
            </span>
          </div>

          {/* Event Images Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
            {group.images.map((img, idx) => (
              <div
                key={`${img.url}-${idx}`}
                onClick={() =>
                  setSelectedImage({
                    url: img.url,
                    eventTitle: group.title,
                    eventDate: group.date,
                    index: idx + 1,
                    total: group.images.length,
                  })
                }
                className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-accent/20 border border-accent/40 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={img.url}
                  alt={`${group.title} photo ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="w-8 h-8 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center cursor-pointer animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] bg-background rounded-2xl overflow-hidden shadow-2xl border border-accent/60 cursor-default flex flex-col"
          >
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center text-sm transition-colors cursor-pointer shadow-md"
            >
              ✕
            </button>

            <div className="relative w-full aspect-4/3 sm:aspect-16/10 bg-black">
              <Image
                src={selectedImage.url}
                alt={selectedImage.eventTitle}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
            </div>

            <div className="p-4 sm:p-5 bg-background border-t border-accent/40 flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-base sm:text-lg text-primary">
                  {selectedImage.eventTitle}
                </h4>
                <p className="text-xs text-foreground/60">{selectedImage.eventDate}</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                {selectedImage.index} / {selectedImage.total}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
