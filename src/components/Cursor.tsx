type CursorProps = {
  size?: 'small' | 'normal' | 'large';
};

function Cursor({ size = 'normal' }: CursorProps) {
  return <span className={`cursor cursor-${size}`} aria-hidden="true" />;
}

export default Cursor;
