import checkPropTypes from 'check-prop-types';

export const checkProps = (component, expectedProps) => {
    const propsError = checkPropTypes(component.checkPropTypes, expectedProps, 'props', component.name);
    return propsError;
};