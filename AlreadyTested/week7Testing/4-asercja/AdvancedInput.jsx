export function AdvancedInput({
  isDisabled,
  isVisible,
  className,
  value,
  onChange,
}) {
  if (!isVisible) {
    return null;
  }

  const inputClassName = isDisabled ? "input inactive" : `input ${className}`;

  return (
    <input
      className={inputClassName}
      value={value}
      onChange={onChange}
      disabled={isDisabled}
    />
  );
}
