import checkPropTypes from 'check-prop-types';

export const checkProps = (component, expectedProps) => {
    // const name = `${component.displayName}`;
    const propsError = checkPropTypes(component.WrappedComponent.propTypes, expectedProps, 'props', component.displayName);
    
    
    return propsError;
};

export const checkProps1 = (component, expectedProps) => {
    // const name = `${component.displayName}`;
    const propsError = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
    
    
    return propsError;
};