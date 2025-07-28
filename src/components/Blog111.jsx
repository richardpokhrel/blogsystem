export default func BlogHero1 = () => (
  <section className="relative isolate overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
    {/* Background elements */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute left-1/2 top-0 -ml-24 -translate-x-1/2 blur-3xl lg:ml-24 xl:-ml-48">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary to-secondary opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
    
    <div className="container px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
          Latest Insights
        </div>
        
        {/* Main heading */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Discover Our <span className="text-primary">Blog</span>
        </h1>
        
        {/* Subheading */}
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Dive into our collection of articles, tutorials, and thought leadership pieces that showcase our expertise.
        </p>
        
        {/* Search/CTA (optional) */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search articles..."
              className="block w-full rounded-full border-0 bg-muted/50 py-3 pl-6 pr-12 text-muted-foreground shadow-sm ring-1 ring-inset ring-muted-foreground/10 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
            />
            <div className="absolute inset-y-0 right-0 flex py-3 pr-3">
              <button
                type="button"
                className="rounded-full bg-primary p-2 text-white shadow-sm hover:bg-primary/90  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Wave divider */}
    <div className="absolute inset-x-0 bottom-0 h-24 bg-[url('/wave-pattern.svg')] bg-[length:1200px_100px] bg-repeat-x opacity-10"></div>
  </section>
);