import mm from './micromatch'

function ensureArray(thing) {
	if (Array.isArray(thing)) return thing;
	if (thing == undefined) return [];
	return [thing];
}

export function createFilter({include, exclude}) {
	const getMatcher = (id) => {
		return id instanceof RegExp
			? id
			: {
					test: mm.matcher(
						id.split('/').join('/'),
						{ dot: true }
					)
			  };
	};

	const includeMatchers = ensureArray(include).map(getMatcher);
	const excludeMatchers = ensureArray(exclude).map(getMatcher);

	return function(id) {
		if (typeof id !== 'string') return false;
		if (/\0/.test(id)) return false;

		for (let i = 0; i < excludeMatchers.length; ++i) {
			const matcher = excludeMatchers[i];
			if (matcher.test(id)) return false;
		}

		for (let i = 0; i < includeMatchers.length; ++i) {
			const matcher = includeMatchers[i];
			if (matcher.test(id)) return true;
		}

		return !includeMatchers.length;
	};
};

export function createConfig (config) {
  return Object.assign({
    exclude: [],
    include: []
  }, config)
}
