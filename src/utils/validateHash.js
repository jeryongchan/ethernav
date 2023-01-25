export function validateHash(addr)
{
  return /^0x([A-Fa-f0-9]{64})$/.test(addr);
}