/**
 * Input Field for JSON-schema type:boolean.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * This Source Code includes react-jsonschema-form
 * released under the Apache License 2.0.
 * https://github.com/mozilla-services/react-jsonschema-form
 * Date on whitch referred: Thu, Mar 08, 2018  1:08:52 PM
 */

'use strict';

/* globals SchemaUtils, Utils */

function BooleanField(schema,
                      formData,
                      idSchema,
                      name,
                      definitions,
                      onChange,
                      required = false,
                      disabled = false,
                      readonly = false) {
  this.schema = SchemaUtils.retrieveSchema(schema, definitions);
  this.formData = formData;
  this.idSchema = idSchema;
  this.name = name;
  this.definitions = definitions;
  this.onChange = onChange;
  this.required = required;
  this.disabled = disabled;
  this.readonly = readonly;

  return this;
}

BooleanField.prototype.onBooleanChange = function(event) {
  this.formData = event.target.checked;

  if (this.onChange) {
    this.onChange(this.formData);
  }
};

BooleanField.prototype.render = function() {
  const id = Utils.escapeHtml(this.idSchema.$id);
  const value = this.formData;
  const field = document.createElement('div');
  field.className = 'checkbox';

  let title = this.schema.title ? this.schema.title : this.name;
  title = Utils.escapeHtml(title);
  title = this.required ? title + SchemaUtils.REQUIRED_FIELD_SYMBOL : title;

  field.innerHTML = `
    <input
    type="checkbox"
    id="${id}"
    ${value ? 'checked' : ''}
    ${this.readonly ? 'readonly' : ''}
    ${this.disabled ? 'disabled' : ''}
    />
    <span class="checkbox-title">${title}</span>
    `;

  const input = field.querySelector(`#${id}`);
  input.onchange = this.onBooleanChange.bind(this);

  return field;
};
