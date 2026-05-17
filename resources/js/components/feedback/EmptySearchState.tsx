import { SearchX } from 'lucide-react';

type EmptySearchStateProps = {
  query?: string;
  entityName?: string;
};

export default function EmptySearchState({
  query = '',
  entityName = 'barangays',
}: EmptySearchStateProps) {
  return (
    <div className="col-span-full">
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:py-16">
        {/* Icon container */}
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
          <SearchX className="h-6 w-6" aria-hidden="true" />
        </div>

        {/* Main text */}
        <h3 className="mb-2 text-center text-lg font-semibold text-slate-900 dark:text-slate-50">
          No matching {entityName} found
        </h3>

        {/* Subtext */}
        <p className="max-w-sm text-center text-sm text-slate-600 dark:text-slate-400">
          {query ? (
            <>
              We couldn't find any {entityName} matching <span className="font-medium">"{query}"</span>.
              <br />
              Try searching with a different keyword.
            </>
          ) : (
            `Check spelling or try another ${entityName} name.`
          )}
        </p>
      </div>
    </div>
  );
}
