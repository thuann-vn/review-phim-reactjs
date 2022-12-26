import { genresList } from "../dataConfig";

const useGenreConversion = genres => {
	const genresConvertedList = [];
	genres
		.slice(0, 3)
		.map(genre =>
			genre.name
		);

	return genresConvertedList;
};

export default useGenreConversion;
