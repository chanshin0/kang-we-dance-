package com.ssafy.kang.status.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.kang.common.ErrorCode;
import com.ssafy.kang.common.SuccessCode;
import com.ssafy.kang.common.dto.ApiResponse;
import com.ssafy.kang.play.model.PlayRecordDto;
import com.ssafy.kang.status.model.service.StatusService;
import com.ssafy.kang.util.UnicodeKorean;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequestMapping("/status")
@RestController
@RequiredArgsConstructor
public class StatusController {

//	| orderList() | 목록 조회 유형의 서비스 |
//	| orderDetails() | 단 건 상세 조회 유형의 controller 메서드 |
//	| orderSave() | 등록/수정/삭제 가 동시에 일어나는 유형의 controller 메서드 |
//	| orderAdd() | 등록만 하는 유형의 controller 메서드 |
//	| orderModify() | 수정만 하는 유형의 controller 메서드 |
//	| orderRemove() | 삭제만 하는 유형의 controller 메서드 |
	@Autowired
	StatusService statusService;
	UnicodeKorean unicodeKorean = new UnicodeKorean();

	@GetMapping("/play-record")
	public ApiResponse<?> playRecordDetails(@RequestHeader("access_token") String accessToken) throws Exception {
		try {
			// 임시값 -> 토큰 구현전까지만 이렇게 사용
			int childIdx = 0;
			List<PlayRecordDto> playRecordDto = statusService.findplayRecord(childIdx);
			return ApiResponse.success(SuccessCode.READ_PLAYRECORD_LIST, playRecordDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@GetMapping("/search-food/{word}")
	public ApiResponse<?> searchHash(@RequestHeader("access_token") String accessToken,
			@PathVariable("word") String word) {

		try {
			return ApiResponse.success(SuccessCode.READ_FOOD_LIST,
					statusService.findFoodList(unicodeKorean.KtoE(word)));
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	// 검색을 위해 korean ->english 변환 API
	@GetMapping
	public ApiResponse<?> temp() {

		try {
			for (int i = 15912; i <= 85469; i++) {
				String t = statusService.temps(i);
				if (t.length() >= 30)
					continue;
				statusService.tumpu(unicodeKorean.KtoE(t), i + "");

			}
			System.out.println("끝!~~");
			return ApiResponse.success(SuccessCode.CREATE_KAKAO);
		} catch (Exception e) {
			// TODO: handle exception
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
}