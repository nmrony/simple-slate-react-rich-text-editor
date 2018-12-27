import PluginEditList from '@guestbell/slate-edit-list';
import { isKeyHotkey } from 'is-hotkey';
import jsonSize from 'json-size';
import React, { Component } from 'react';
import { Value } from 'slate';
import { Editor } from 'slate-react';
import { Button, Icon, Image, Input, Toolbar, ToolBarButton } from './helpers/components';
import PasteImagify from './plugins/slate-imagify-url';
const allowedImageTypes = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
const plugin = PluginEditList();
const plugins = [plugin, PasteImagify()];

const INITIAL_STATE = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text'
          }
        ]
      }
    ]
  }
});

const schema = {
  blocks: {
    image: {
      isVoid: true
    }
  }
};

/**
 * Define the default node type.
 *
 * @type {String}
 */
const DEFAULT_NODE = 'paragraph';

/**
 * Define Hotkeys
 */
const isEnterPressed = isKeyHotkey('enter');
const isTabPressed = isKeyHotkey('tab');
const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

class TextEditor extends Component {
  /**
   * Deserialize the initial editor value.
   * @type {Object}
   */
  constructor(props) {
    super(props);
    this.state = {
      value: INITIAL_STATE,
      counter: 0
    };
    this.fileUpload = React.createRef();
  }

  commands = {
    insertPastedImage(editor, url) {
      editor
        .insertBlock({
          type: 'image',
          data: { src: url }
        })
        .insertBlock(DEFAULT_NODE)
        .moveToStartOfNextText()
        .focus();
    }
  };

  /**
   * Render.
   *
   * @return {Element}
   */
  render() {
    return (
      <>
        <div className="text-editor">
          <input
            type="file"
            name="file"
            onChange={this.onImageUpload}
            style={{ display: 'none' }}
            ref={this.fileUpload}
          />
          <Toolbar>
            {this.renderMarkButton('bold', 'format_bold')}
            {this.renderMarkButton('italic', 'format_italic')}
            {this.renderMarkButton('underlined', 'format_underlined')}
            {this.renderMarkButton('code', 'code')}
            {this.renderBlockButton('heading-one', 'looks_one')}
            {this.renderBlockButton('heading-two', 'looks_two')}
            {this.renderBlockButton('block-quote', 'format_quote')}
            {this.renderBlockButton('ol_list', 'format_list_numbered')}
            {this.renderBlockButton('ul_list', 'format_list_bulleted')}
            <ToolBarButton onMouseDown={event => this.fileUpload.current.click()}>
              <Icon>{`image`}</Icon>
            </ToolBarButton>
          </Toolbar>
          <Editor
            plugins={plugins}
            schema={schema}
            autoFocus
            commands={this.commands}
            placeholder="Enter some rich text..."
            ref={this.ref}
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderNode={this.renderNode}
            renderMark={this.renderMark}
            shouldNodeComponentUpdate={props => props.node.type === 'list_item'}
          />
        </div>
        <div>
          <Button onClick={this.saveEditorContent} primary={true}>
            Save{' '}
          </Button>
          <Button onClick={this.handleContentRestore}>Restore </Button>
          Node Count: <Input type="number" min="0" value={this.state.counter} onChange={this.handleNodeCounter} />
          <sup>*</sup>
          <div className="notes">
            <ul>
              <li>
                * <em>0</em> for unlimited entry.
              </li>
              <li>Built on latest Slate</li>
              <li>Supported image: jpg, jpeg, png, gif, svg</li>
              <li>
                Done in hurry, did not follow best practices. apologies{' '}
                <span role="img" aria-label="wink">
                  😉
                </span>
              </li>
              <li>Adds single command github page deployment task as well</li>
            </ul>
          </div>
        </div>
      </>
    );
  }

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */
  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */
  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };

  /**
   * Store a reference to the `editor`.
   *
   * @param {Editor} editor
   */
  ref = editor => {
    this.editor = editor;
  };

  /**
   *  execute Editor commands
   *
   * @memberof TextEditor
   */
  execute = command => {
    this.editor.command(command);
  };

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */
  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);

    return (
      <ToolBarButton active={isActive} onMouseDown={event => this.onClickMark(event, type)}>
        <Icon>{icon}</Icon>
      </ToolBarButton>
    );
  };

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */
  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (['ol_list', 'ul_list'].includes(type)) {
      const {
        value: { document, blocks }
      } = this.state;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock('list-item') && parent && parent.type === type;
      }
    }

    return (
      <ToolBarButton active={isActive} onMouseDown={event => this.onClickBlock(event, type)}>
        <Icon>{icon}</Icon>
      </ToolBarButton>
    );
  };

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */
  renderNode = (props, editor, next) => {
    const { attributes, children, node, isFocused } = props;
    const isCurrentItem = plugin.utils.getItemsAtRange(editor.value).contains(node);
    switch (node.type) {
      case 'image':
        const src = node.data.get('src');
        return <Image src={src} selected={isFocused} {...attributes} />;
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'ul_list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list_item':
        return (
          <li
            className={isCurrentItem ? 'current-item' : ''}
            title={isCurrentItem ? 'Current Item' : ''}
            {...props.attributes}
          >
            {props.children}
          </li>
        );
      case 'ol_list':
        return <ol {...attributes}>{children}</ol>;
      case 'link':
        return (
          <a {...attributes} href={node.data.get('url')}>
            {children}
          </a>
        );
      default:
        return next();
    }
  };

  /**
   * Handles Image Upload
   *
   * @memberof TextEditor
   */
  onImageUpload = event => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    const { name } = selectedFile;
    const extension = name
      .split('.')
      .pop()
      .toLowerCase();
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        if (allowedImageTypes.indexOf(extension) === -1) {
          return alert('Please select an image file');
        }
        this.editor
          .insertBlock({
            type: 'image',
            isVoid: true,
            data: { src: reader.result }
          })
          .insertBlock(DEFAULT_NODE)
          .moveToStartOfNextText()
          .focus();
      },
      false
    );

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */
  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  /**
   * On change, save the new `value`.
   *
   * @param {Editor} editor
   */
  onChange = ({ value }) => {
    this.setState({ value });
  };

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @return {Change}
   */
  onKeyDown = (event, editor, next) => {
    let mark;
    if (isTabPressed(event)) {
      const { decreaseItemDepth } = plugin.changes;
      const { isSelectionInList, getItemDepth } = plugin.utils;
      const { value } = this.state;
      const isItemInList = isSelectionInList(value);
      const itemDepth = getItemDepth(value);
      if (itemDepth === 3 && isItemInList) {
        this.execute(decreaseItemDepth);
        return next();
      }
      return next();
    } else if (isEnterPressed(event)) {
      return this.checkTopLevelNodeLength(next);
    } else if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */
  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */
  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    // Handle everything but list buttons.
    if (type !== 'ul_list' && type !== 'ol_list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('ul_list')
          .unwrapBlock('ol_list');
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const { isSelectionInList } = plugin.utils;
      const { unwrapList } = plugin.changes;
      const isItemInList = isSelectionInList(value);
      if (isItemInList) {
        this.execute(unwrapList);
      } else {
        editor.unwrapBlock(type === 'ul_list' ? 'ol_list' : 'ul_list').wrapBlock(type);
      }
    }
  };

  /**
   * Save Editor Content
   *
   * @memberof TextEditor
   */
  saveEditorContent = event => {
    event.preventDefault();
    const { value } = this.state;
    const content = JSON.stringify(value.toJSON());
    if (jsonSize(content) > 5 * 1e6) {
      return alert('Localstorage capasity exceeded!!');
    }

    if (window.confirm('Are you sure to save editor content?')) {
      localStorage.setItem('content', content);
      this.setState({
        value: INITIAL_STATE,
        counter: 0
      });
    }
  };

  /**
   * Restore Editor Content
   *
   * @memberof TextEditor
   */
  handleContentRestore = event => {
    event.preventDefault();
    const jsonContent = localStorage.getItem('content');
    const content = (jsonContent && JSON.parse(jsonContent)) || INITIAL_STATE;
    this.setState({
      value: Value.fromJSON(content),
      counter: 0
    });
  };

  /**
   * Restrict Editor content
   *
   * @memberof TextEditor
   */
  checkTopLevelNodeLength = next => {
    const { value, counter } = this.state;
    const topLevelNodeLength = value.document.nodes.toArray().length;
    return (counter === 0 || topLevelNodeLength < counter) && next();
  };

  /**
   * Set number of top level slate node length
   *
   * @memberof TextEditor
   */
  handleNodeCounter = event => {
    this.setState({
      counter: event.target.value
    });
  };
}

export default TextEditor;
