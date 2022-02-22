import React from 'react';

const callouts = [
  {
    name: 'Best Discount  🤯',
    description: 'Daliy discount offer',
    imageSrc:
      'https://png.pngtree.com/png-clipart/20200522/ourlarge/pngtree-big-sale-best-offer-png-image_2210803.jpg',
    imageAlt:
      'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    name: 'Top Selling 💸',
    description: 'Journals and note-taking',
    imageSrc:
      'https://thumbs.dreamstime.com/b/top-selling-stamp-text-top-selling-inside-illustration-109893873.jpg',
    imageAlt:
      'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    name: 'Best Clothes',
    description: 'Daily commute essentials',
    imageSrc:
      'https://media.istockphoto.com/photos/this-one-match-perfect-with-me-picture-id1293366109?b=1&k=20&m=1293366109&s=170667a&w=0&h=2z_h2WlM3291IRKFXrdmtObnCt93rNNdNN6mqvnKD1I=',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
];

const DownBanner = () => {
  return (
    <div id='about' className='bg-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none'>
          <h2 className='text-2xl font-extrabold text-gray-900'>Collections</h2>

          <div className='mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6'>
            {callouts.map((callout) => (
              <div key={callout.name} className='group relative'>
                <div className='relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1'>
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className='w-full h-full object-center object-cover'
                  />
                </div>
                <h3 className='mt-6 text-sm text-gray-500'>
                  <a href={callout.href}>
                    <span className='absolute inset-0' />
                    {callout.name}
                  </a>
                </h3>
                <p className='text-base font-semibold text-gray-900'>
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownBanner;
