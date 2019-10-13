import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Input as SUInput } from 'semantic-ui-react';

/* eslint-disable */
import MarkdownEditor from "shared/markdownEditor";
import { underscorer, getTextFromChildren as getText } from "utilities";
/* eslint-enable */

const Input = props => {
  const {
    label,
    placeholder = label.props ? getText(label.props.children) : label,
    name = underscorer(label.props ? getText(label.props.children) : label),
    onChange,
    inputLabel,
    labelPosition = 'left',
    autoComplete = name,
    fluid = true,
    inputType = 'input',
    options,
    dataArray,
    id,
    allowLP,
    ...rest
  } = props;
  const customInput = allowLP ? undefined : <input data-lpignore="true" />;
  const selectFocus = e => e.target.setAttribute('autocomplete', name);
  return (
    <>
      {inputType === 'input' && (
        <Form.Field>
          <label htmlFor={name}>{label}</label>
          <SUInput
            {...rest}
            label={inputLabel}
            input={customInput}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            labelPosition={labelPosition}
            autoComplete={autoComplete}
            fluid={fluid}
          />
        </Form.Field>
      )}

      {inputType === 'textarea' && (
        <Form.TextArea
          {...rest}
          label={label}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />
      )}

      {inputType === 'markdown' && (
        <Form.Field>
          <label htmlFor={name}>{label}</label>
          <MarkdownEditor
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            {...rest}
          />
        </Form.Field>
      )}

      {inputType === 'select' && (
        <Form.Select
          selectOnBlur={false}
          selectOnNavigation={false}
          {...rest}
          placeholder={placeholder}
          label={label}
          name={name}
          onChange={onChange}
          options={options}
          fluid={fluid}
          onFocus={selectFocus}
        />
      )}

      {inputType === 'checkbox' && (
        <Form.Checkbox
          {...rest}
          label={label}
          name={name}
          onChange={onChange}
        />
      )}

      {inputType === 'radio' &&
        dataArray.map(item => (
          <Form.Radio
            {...rest}
            key={item.label}
            label={item.label}
            name={name}
            value={item.value}
            checked={item.checked}
            onChange={onChange}
          />
        ))}
      {inputType === 'file' && (
        <>
          <Form.Input
            {...rest}
            type="file"
            onChange={onChange}
            className="input-file"
            id={id}
            label=""
          />
          <Label
            htmlFor={id}
            className="ui button"
            as="label"
            content={label}
          />
        </>
      )}
    </>
  );
};

const { string, func, bool, array, oneOfType, object } = PropTypes;
Input.propTypes = {
  label: oneOfType([string, object]).isRequired,
  inputLabel: string,
  placeholder: string,
  name: string,
  onChange: func,
  labelPosition: string,
  autoComplete: string,
  fluid: bool,
  options: array,
  inputType: string,
  dataArray: array,
  allowLP: bool,
  id: string
};

export default Input;
