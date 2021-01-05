import _ from 'lodash';

const getResult = async () => {
  const result = await new Promise((resolve) => resolve([1, 2, 3]));

  console.log('result :>> ', result);

  return result;
};

class Utiil {
  static id = Date.now();
}

console.log('lodash :>> ', _.random(0, 42, true));

// setTimeout(async () => {
//     try {
//         // const { default: random } = await import('lodash/random');
//         const { default: _ } = await import('lodash');

//         console.log('lodash :>> ', _.random(0, 42, true));
//     } catch (e) {
//         console.error('error in: ', e);
//     }
// }, 1000);

export { getResult, Utiil };
