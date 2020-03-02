import { getPokemons } from './fetchers';

export function setFilter(textFilter, component) {
    if(textFilter !== component.state.textFilter) {
        component.setState(
            {
                textFilter
            }
        );

        getPokemons(component, textFilter, false);
    }
}