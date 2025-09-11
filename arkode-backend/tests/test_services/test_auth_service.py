import pytest
from app.services.auth_service import get_password_hash, verify_password

def test_password_hashing():
    password = "testpassword"
    hashed = get_password_hash(password)
    assert hashed != password
    assert verify_password(password, hashed)
    assert not verify_password("wrongpassword", hashed)
