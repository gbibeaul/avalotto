import animation from './animation';
import border from './border';
import font from './font';
import radius from './radius';
import shadow from './shadow';
import spacing from './spacing';

export { font, spacing };

export default {
    name: 'fv-common-properties',
    variables: {
        ...animation,
        ...border,
        ...font,
        ...radius,
        ...shadow,
        ...spacing,
    },
};
