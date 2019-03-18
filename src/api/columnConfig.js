const columnConfig = {
  people: {
    name: {
      title: 'Name',
      isSortable: true,
      isSearchable: true,
      link: '/people/:fieldName'
    },
    gender: {
      title: 'Gender',
      isSortable: true,
    },
    birth_year: {
      title: 'Birth year',
      isSortable: true,
    },
    height: {
      title: 'Height',
      isSortable: true,
    },
    mass: {
      title: 'Mass',
      isSortable: true,
    },
  },

  films: {
    title: {
      title: 'Title',
      isSortable: true, 
      isSearchable: true,
      link: '/people/:fieldName'
    },
    episode_id: {
      title: 'Episode number',
      isSortable: true,
    },
    release_date: {
      title: 'Relised',
      isSortable: true,
    },
    director: {
      title: 'Director',
      isSearchable: true,
    },
    producer: {
      title: 'Producer',
      isSearchable: true,
    },
  },

  starships: {
    name: {
      title: 'Name',
      isSortable: true, 
      isSearchable: true,
      link: '/people/:fieldName'
    },
    starship_class: {
      title: 'Ship class',
      isSearchable: true,
    },
    created: {
      title: 'Created',
      isSortable: true,
    },
    length: {
      title: 'Length',
      isSortable: true,
    },
    cost_in_credits: {
      title: 'Price, credits',
      isSearchable: true,
    },
  },

  vehicles: {
    name: {
      title: 'Name',
      isSortable: true, 
      isSearchable: true,
      link: '/people/:fieldName'
    },
    model: {
      title: 'Model',
      isSearchable: true,
    },
    created: {
      title: 'Created',
      isSortable: true,
    },
    length: {
      title: 'Length',
      isSortable: true,
    },
    cost_in_credits: {
      title: 'Price, credits',
      isSearchable: true,
    },
  },

  species: {
    name: {
      title: 'Name',
      isSortable: true, 
      isSearchable: true,
      link: '/people/:fieldName'
    },
    classification: {
      title: 'Classification',
      isSearchable: true,
    },
    average_height: {
      title: 'Average height',
      isSortable: true,
    },
    average_lifespan: {
      title: 'Average lifespan',
      isSortable: true,
    },
    skin_colors: {
      title: 'Skin colors',
      isSearchable: true,
    },
  },

  planets: {
    name: {
      title: 'Name',
      isSortable: true, 
      isSearchable: true,
      link: '/people/:fieldName'
    },
    climate: {
      title: 'Climate',
      isSortable: true,
    },
    population: {
      title: 'Population',
      isSortable: true,
    },
    orbital_period: {
      title: 'Orbital period',
      isSortable: true,
    },
    diameter: {
      title: 'Diameter',
      isSortable: true,
    }
  }
}

export default columnConfig