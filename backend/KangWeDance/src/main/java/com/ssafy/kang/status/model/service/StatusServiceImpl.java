package com.ssafy.kang.status.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.kang.play.model.PlayRecordDto;
import com.ssafy.kang.status.model.FoodsDto;
import com.ssafy.kang.status.model.mapper.StatusMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatusServiceImpl implements StatusService {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<PlayRecordDto> findplayRecord(int childIdx) throws Exception {
		return sqlSession.getMapper(StatusMapper.class).selectPlayRecord(childIdx);

	}

	@Override
	public List<FoodsDto> findFoodList(String ktoE) throws Exception {
		return sqlSession.getMapper(StatusMapper.class).selectFoodList(ktoE);
	}

	@Override
	public String temps(int i) throws Exception {
		return sqlSession.getMapper(StatusMapper.class).temps(i);
	}

	@Override
	public void tumpu(String k, String i) throws Exception {
		// TODO Auto-generated method stub
		sqlSession.getMapper(StatusMapper.class).tumpu(k, i);
	}
}