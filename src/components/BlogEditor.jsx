'use client';

import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import Image from 'next/image';

export default function BlogEditor({ editing = null, onSaved }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setContent(editing.content);
      setImage(editing.image || '');
      setPreviewUrl(editing.image || '');
    } else {
      setTitle('');
      setContent('');
      setImage('');
      setPreviewUrl('');
    }
  }, [editing]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content.');
      return;
    }

    const blog = {
      id: editing?.id ?? uuid(),
      title,
      content,
      image: previewUrl || image,
      createdAt: editing?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editing) {
      updateBlog(blog);
    } else {
      addBlog(blog);
    }

    onSaved();
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter blog post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="image">Upload Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {previewUrl && (
          <div className="mt-2">
            <Image src={previewUrl} alt="Preview" width={300} height={200} className="rounded" />
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
        />
      </div>

      <Button onClick={handleSubmit} className="w-full">
        {editing ? 'Update Post' : 'Create Post'}
      </Button>
    </div>
  );
}

// Note: You need to import or define addBlog and updateBlog functions in this file or import them properly.
