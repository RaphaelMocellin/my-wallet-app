export const SUBMIT_EMAIL = 'SUBMIT_EMAIL';

const submitEmail = (email) => ({
  type: SUBMIT_EMAIL,
  payload: email,
});

export { submitEmail };
