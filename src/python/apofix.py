
def fixEncoding(s: str) -> str:
    return s.encode('latin5').decode('cp1256')

def unfixEncoding(s: str) -> str:
    return s.encode('cp1256').decode('latin5')

