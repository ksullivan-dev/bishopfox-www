import { jsonToFormData } from 'utilities';

test('transforms json data into FormData', () => {
  const json = {
    name: 'Jim',
    Position: 'President',
    dob: {
      month: '09',
      day: '09',
      year: '2000'
    },
    other: null
  };

  const formData = new FormData();
  formData.append('name', 'Jim');
  formData.append('Position', 'President');
  formData.append('dob[month]', '09');
  formData.append('dob[day]', '09');
  formData.append('dob[year]', '2000');
  formData.append('other', '');
  const json_formData = jsonToFormData(json);
  expect(json_formData).toEqual(formData);
});
