import { useSearchParams } from 'next/navigation';

export default function useSearchParamsList() {
	const searchParams = useSearchParams();
	const page = Number(searchParams.get('page'));
	const nextPage = page + 1;
	const previousPage = page !== 1 && page !== 0 ? page - 1 : null;
	return { page, nextPage, previousPage };
}
