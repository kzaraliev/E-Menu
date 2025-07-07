import { getSortedPostsData } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Блог | E-Menu - Дигитални менюта за ресторанти',
  description: 'Прочетете полезни статии за дигитални менюта, ресторантска технология и съвети за управление на хранителен бизнес.',
  keywords: 'блог, дигитални менюта, ресторанти, технология, QR кодове, безконтактни менюта',
  openGraph: {
    title: 'Блог | E-Menu - Дигитални менюта за ресторанти',
    description: 'Прочетете полезни статии за дигитални менюта, ресторантска технология и съвети за управление на хранителен бизнес.',
    type: 'website',
    locale: 'bg_BG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Блог | E-Menu',
    description: 'Полезни статии за дигитални менюта и ресторантска технология',
  },
  alternates: {
    canonical: '/blog',
  },
  robots: {
    index: true,
    follow: true,
  }
};

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

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'E-Menu Блог',
    description: 'Блог за дигитални менюта и ресторантска технология',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'E-Menu',
    },
    blogPost: allPostsData.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/blog/${post.id}`,
      author: {
        '@type': 'Person',
        name: post.author || 'E-Menu Team',
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                Блог за дигитални менюта
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Открийте най-новите тенденции в ресторантската индустрия, 
                съвети за дигитални менюта и как да оптимизирате вашия бизнес.
              </p>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {allPostsData.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-8 bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Очаквайте скоро нови статии
              </h2>
              <p className="text-slate-600">
                Подготвяме интересно съдържание за вас. Следете ни за най-новите статии!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPostsData.map((post) => (
                <article 
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                >
                  {post.image && (
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    {post.category && (
                      <div className="flex items-center mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {post.category}
                        </span>
                      </div>
                    )}
                    
                    <h2 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      <Link href={`/blog/${post.id}`} className="block">
                        {post.title}
                      </Link>
                    </h2>
                    
                    {post.description && (
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {post.description}
                      </p>
                    )}
                    
                    <div className="space-y-3">
                      <time dateTime={post.date} className="flex items-center gap-2 text-sm text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(post.date)}
                      </time>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {calculateReadingTime(post.content)}
                      </div>
                      
                      {post.author && (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-xs">
                              {post.author.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium text-slate-700 text-sm">
                            {post.author}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 