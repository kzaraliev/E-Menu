import { getPostData, getAllPostIds } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const postData = await getPostData(slug);
    
    return {
      title: `${postData.title} | E-Menu Блог`,
      description: postData.description || `Прочетете статията "${postData.title}" в E-Menu блога за дигитални менюта и ресторантска технология.`,
      keywords: postData.keywords || `${postData.title}, дигитални менюта, ресторанти, технология`,
      authors: [{ name: postData.author || 'E-Menu Team' }],
      openGraph: {
        title: postData.title,
        description: postData.description,
        type: 'article',
        publishedTime: postData.date,
        authors: [postData.author || 'E-Menu Team'],
        images: postData.image ? [
          {
            url: postData.image,
            width: 1200,
            height: 630,
            alt: postData.title,
          }
        ] : [],
        locale: 'bg_BG',
      },
      twitter: {
        card: 'summary_large_image',
        title: postData.title,
        description: postData.description,
        images: postData.image ? [postData.image] : [],
      },
      alternates: {
        canonical: `/blog/${slug}`,
      },
      robots: {
        index: true,
        follow: true,
      }
    };
  } catch (error) {
    return {
      title: 'Статията не е намерена | E-Menu Блог',
      description: 'Търсената статия не съществува.',
    };
  }
}

export async function generateStaticParams() {
  const posts = getAllPostIds();
  return posts.map((post) => ({
    slug: post.params.id,
  }));
}

function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('bg-BG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function calculateReadingTime(content) {
  if (!content) return '1 минута';
  
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  
  return `${time} минут${time === 1 ? 'а' : 'и'}`;
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  try {
    const postData = await getPostData(slug);
    
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: postData.title,
      description: postData.description,
      image: postData.image,
      datePublished: postData.date,
      dateModified: postData.modified || postData.date,
      author: {
        '@type': 'Person',
        name: postData.author || 'E-Menu Team',
      },
      publisher: {
        '@type': 'Organization',
        name: 'E-Menu',
        logo: {
          '@type': 'ImageObject',
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/blog/${slug}`,
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <article className="min-h-screen bg-white">
          {/* Breadcrumb Navigation */}
          <nav className="bg-slate-50 border-b border-slate-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <ol className="flex items-center space-x-2 text-sm text-slate-600">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition-colors">
                    Начало
                  </Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/blog" className="hover:text-blue-600 transition-colors">
                    Блог
                  </Link>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-slate-900 font-medium">
                    {postData.title}
                  </span>
                </li>
              </ol>
            </div>
          </nav>

          {/* Hero Image */}
          {postData.image && (
            <div className="w-full h-64 sm:h-80 lg:h-96 relative overflow-hidden">
              <Image
                src={postData.image}
                alt={postData.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Header */}
          <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {postData.category && (
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {postData.category}
                </span>
              </div>
            )}
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {postData.title}
            </h1>
            
            {postData.description && (
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                {postData.description}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 border-b border-slate-200 pb-8">
              {postData.author && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-xs">
                      {postData.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium text-slate-900">
                    {postData.author}
                  </span>
                </div>
              )}
              
              <time dateTime={postData.date} className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(postData.date)}</span>
              </time>
              
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{calculateReadingTime(postData.contentHtml)}</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div 
              className="prose prose-lg prose-slate max-w-none
                         prose-headings:text-slate-900 prose-headings:font-semibold
                         prose-p:text-slate-700 prose-p:leading-relaxed
                         prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-slate-900 prose-strong:font-semibold
                         prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                         prose-pre:bg-slate-900 prose-pre:text-slate-100
                         prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r
                         prose-ul:list-disc prose-ol:list-decimal
                         prose-li:text-slate-700
                         prose-img:rounded-lg prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
          </div>

          {/* Back to Blog */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="border-t border-slate-200 pt-8">
              <Link 
                href="/blog"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Обратно към блога</span>
              </Link>
            </div>
          </div>
        </article>
      </>
    );
  } catch (error) {
    notFound();
  }
} 